import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AuthentikAuthGuard extends AuthGuard('authentik'){}