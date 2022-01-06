import { Body, Controller, Post } from '@nestjs/common';
import { Client,ClientKafka, Transport  } from '@nestjs/microservices';
import { PaymentDTO } from './payment.dto';

@Controller('payment')
export class PaymentController {

    @Client({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'kafkaSample',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'my-kafka-consumer'
          }
        }
      })
      client: ClientKafka;

      async onModuleInit() {
        this.client.subscribeToResponseOf('payment-topic');
        await this.client.connect();
      }

      @Post()
      doPayment(@Body() payment : PaymentDTO){
        return this.client.send('payment-topic', payment);
      }
}
