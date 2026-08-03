import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {User} from "../../users/entities/user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', '')
    });
  }

  async validate(payload: any): Promise<User> {
    console.log(payload);
    throw new Error('Method not implemented.');

  }
}