import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginDTO, StoryDTO } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { SignUpInt, StoryINT } from './interfaces/signup.interface';

@Controller()
export class AppController {
  constructor(private appServices: AppService) {}

  @Post('/signup')
  createUser(@Body() userData: SignUpDto): Promise<SignUpInt> {
    return this.appServices.createUser(userData);
  }

  @Post('/login')
  loginUser(@Body() userCredential: LoginDTO): Promise<SignUpInt | string> {
    return this.appServices.loginUser(userCredential);
  }

  @Post('/addstory')
  addStory(@Body() story: StoryDTO): Promise<StoryINT> {
    return this.appServices.addStory(story);
  }

  @Get('/stories')
  getStories(): Promise<StoryINT[]> {
    return this.appServices.getStories();
  }

  @Get('/stories/private/:id')
  getPrivateStories(@Param('id') id): Promise<StoryINT[]> {
    return this.appServices.getPrivateStories(id);
  }

  @Delete('/stories/:id')
  deleteStory(@Param('id') id): Promise<StoryINT> {
    return this.appServices.deleteStory(id);
  }

  @Get('/story/:id')
  getStorybyID(@Param('id') id): Promise<StoryINT> {
    return this.appServices.getStoryByID(id);
  }
}
