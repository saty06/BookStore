import { expect } from 'chai';
import sinon from 'sinon';
import UserService from '../../src/services/storeuser.service';
import bcrypt from 'bcrypt';
import { IUser } from '../../src/interfaces/user.interface';
describe('UserService', () => {
  let userService: UserService;
  let mockUserModel: any;
  let mockUtils: any;
  let mockLogger: any;

  beforeEach(() => {
    mockUserModel = {
      create: sinon.stub(),
      findOne: sinon.stub(),
      update: sinon.stub(),
      destroy: sinon.stub(),
      findAll: sinon.stub(),
    };

    mockUtils = {
      getToken: sinon.stub(),
    };

    mockLogger = {
      error: sinon.stub(),
    };

    userService = new UserService();
    (userService as any).User = mockUserModel;
    (userService as any).Utils = mockUtils;
    (userService as any).logger = mockLogger;
  });

  afterEach(() => {
    sinon.restore();
  });
 /// new user 
  describe('newUser', () => {
    it('should create a new user', async () => {
      const mockUser = { id: 1, firstName: 'satya', email: 'satya@example.com' };
      mockUserModel.create.resolves(mockUser);

      const result = await userService.newUser(mockUser);
      expect(result).to.equal(mockUser);
      expect(mockUserModel.create.calledOnce).to.be.true;
    });

    it('should log an error if user creation fails', async () => {
      const error = new Error('User creation failed');
      mockUserModel.create.rejects(error);

      const result = await userService.newUser({ firstName: 'satya', email: 'satya@example.com' });
      expect(result).to.be.undefined;
      expect(mockLogger.error.calledOnce).to.be.true;
      expect(mockLogger.error.calledWith('[Logger] User Services: Register User:', error)).to.be.true;
    });
  });
  // get user means login 
  describe('getUser', () => {
    it('should return user with valid credentials', async () => {
      const mockUser = { id: 1, email: 'satya@example.com', password: await bcrypt.hash('123', 10), role: 'user' };
      mockUserModel.findOne.resolves({ dataValues: mockUser });
      mockUtils.getToken.resolves('mockToken');

      const result = await userService.getUser('satya@example.com', '123', 'user');
      expect(result).to.have.property('token', 'mockToken');
//expect(result.data).to.have.property('dataValues').that.includes({ email: 'satya@example.com' });
    });

    it('should return "Invalid Credentials" if credentials are incorrect', async () => {
      mockUserModel.findOne.resolves(null);

      const result = await userService.getUser('satya@example.com', 'wrongP123', 'user');
      expect(result).to.equal('Invalid Credentials');
    });

    it('should log an error if login fails', async () => {
      const error = new Error('Login failed');
      mockUserModel.findOne.rejects(error);

      const result = await userService.getUser('satya@example.com', '123', 'user');
      expect(result).to.be.undefined;
      expect(mockLogger.error.calledOnce).to.be.true;
      expect(mockLogger.error.calledWith('[Logger] User Services: Login User:', error)).to.be.true;
    });
  });
// update user 
  describe('updateUser', () => {
    it('should update a user', async () => {
      const mockUser = { id: 1, firstName: 'satya', email: 'satya@example.com' };
      mockUserModel.update.resolves([1]);

      const result = await userService.updateUser(1, mockUser);
      expect(result).to.equal(mockUser);
      expect(mockUserModel.update.calledOnce).to.be.true;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      mockUserModel.destroy.resolves(1);

      const result = await userService.deleteUser(1);
      expect(result).to.equal('');
      expect(mockUserModel.destroy.calledOnce).to.be.true;
    });
  });
// get all user to the admin 
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers: IUser[] = [
        { id: 1, firstName: 'satya', lastName: 'singh', email: 'satya@example.com', password: 'hashedpassword', mobileNo: 1234567890, role: 'user' },
        { id: 2, firstName: 'shivay', lastName: 'singh', email: 'shivay@example.com', password: 'hashedpassword', mobileNo: 1234567890, role: 'user' },
      ];
      mockUserModel.findAll.resolves(mockUsers);

      const result = await userService.getAllUsers();
      expect(result).to.be.an('array').that.has.lengthOf(2);
      expect(result[0]).to.include({ firstName: 'satya' });
    });
  });
});
