import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";
import { Telegraf, Telegram } from "telegraf";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const tgToken = process.env.TGBOT;
        const bot = new Telegraf(tgToken)
        const telegram: Telegram = new Telegram(tgToken as string);
        telegram.sendMessage(process.env.TGID, 'Allow to create user?(yes/no)');
        bot.hears('yes', async (ctx) => {
            const candidate = await this.userService.getUserByEmail(userDto.email);
            if (candidate) {
                throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            const user = await this.userService.createUser({ ...userDto, password: hashPassword })
            return this.generateToken(user)
            ctx.reply("User is created");
        })
        bot.launch()

        process.once('SIGINT', () => bot.stop('SIGINT'))
        process.once('SIGTERM', () => bot.stop('SIGTERM'))

    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}
