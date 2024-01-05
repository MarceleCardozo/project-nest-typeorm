import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key', // Substitua pelo seu segredo
      signOptions: { expiresIn: '1h' }, // Ajuste o tempo de expiração conforme necessário
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
