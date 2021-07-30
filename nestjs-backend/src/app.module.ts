import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { SignupSchema } from './schema/signup.schema';
import { StorySchema } from './schema/story.schema';

@Module({
  imports: [
    MongooseModule.forRoot(config.MongodbURI),
    MongooseModule.forFeature([{ name: 'Users', schema: SignupSchema }]),
    MongooseModule.forFeature([{ name: 'Stories', schema: StorySchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
