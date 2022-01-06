import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';

@Module({
  imports: [],
  controllers: [ PaymentController],
  providers: [],
})
export class AppModule {}
