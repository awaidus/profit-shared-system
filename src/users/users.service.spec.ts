import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';

// Mock the DatabaseService
const mockDatabaseService = {
	user: {
		findUnique: jest.fn(),
		update: jest.fn(),
	},
};

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{ provide: DatabaseService, useValue: mockDatabaseService }, 
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
		jest.clearAllMocks(); // Reset mocks between tests
	});

	describe('updateOwnProfile', () => {
		const mockUserId = 1;
		const mockUpdateDto = { name: 'Updated Name', bio: 'Updated Bio' };

		it('should update the user profile if user exists', async () => {
			//find user
			mockDatabaseService.user.findUnique.mockResolvedValue({ id: mockUserId });

			//update profile
			mockDatabaseService.user.update.mockResolvedValue({
				id: mockUserId,
				...mockUpdateDto,
			});

			const result = await service.updateOwnProfile(mockUserId, mockUpdateDto);

			expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
				where: { id: mockUserId },
			});
			expect(mockDatabaseService.user.update).toHaveBeenCalledWith({
				where: { id: mockUserId },
				data: mockUpdateDto,
			});
			expect(result).toEqual({ id: mockUserId, ...mockUpdateDto });
		});

		it('should throw NotFoundException if user does not exist', async () => {
		
      // try to find user
			mockDatabaseService.user.findUnique.mockResolvedValue(null);

			await expect(service.updateOwnProfile(mockUserId, mockUpdateDto)).rejects.toThrow(NotFoundException);

			expect(mockDatabaseService.user.findUnique).toHaveBeenCalledWith({
				where: { id: mockUserId },
			});

			expect(mockDatabaseService.user.update).not.toHaveBeenCalled();
		});
    
	});
});
