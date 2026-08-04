import {Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../../users/entities/user.entity";
import {UsersService} from "../../users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
      private readonly userService: UsersService,
      readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', '')
    });
  }

  async validate(payload: { id: string, iat: number, exp: number }): Promise<User> {
    try {
      const user = await this.userService.findOne(payload.id)
      if (!user || !user?.status) throw new Error('Usuario no existe o esta inactivo')
      return user
    } catch (e) {
      this.logger.error(e)
      throw new UnauthorizedException('Token invalido')
    }


  }
}