import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginINT } from './interfaces/login.interface';
import { SignUpInt, StoryINT } from './interfaces/signup.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Users') private signupModel: Model<SignUpInt>,
    @InjectModel('Stories') private storiesModel: Model<StoryINT>,
  ) {}

  async createUser(user: SignUpInt): Promise<SignUpInt> {
    const newUser = new this.signupModel(user);
    return await newUser.save();
  }

  async loginUser(user: LoginINT): Promise<SignUpInt | string> {
    let User: SignUpInt[] = await this.signupModel.find({
      email: user.email,
      password: user.password,
    });
    if (User.length) {
      return await User[0];
    } else {
      return 'User Not Found';
    }
  }

  async addStory(story: StoryINT): Promise<StoryINT> {
    let newStory = new this.storiesModel(story);
    return await newStory.save();
  }

  async getStories(): Promise<StoryINT[]> {
    return await this.storiesModel
      .find({ visibility: 'public' })
      .sort({ createdAt: -1 });
  }

  async getPrivateStories(param: string): Promise<StoryINT[]> {
    return await this.storiesModel
      .find({
        user_id: param,
        visibility: 'private',
      })
      .sort({ createdAt: -1 });
  }

  async deleteStory(param: string): Promise<StoryINT> {
    return await this.storiesModel.findByIdAndRemove(param);
  }

  async getStoryByID(id: string): Promise<StoryINT> {
    return await this.storiesModel.findById(id);
  }
}
