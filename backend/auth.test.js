const {loginCLient} = require('./Client/Controller/ClientController');
const Client = require('./Client/Model/ClientSchema');
const bcrypt = require('bcryptjs');

jest.mock('./Client/Model/ClientSchema');
jest.mock('bcryptjs');



describe('loginCLient', () => {
    // it('should send a 200 status and user data if login is successful', async () => {
    //     const user = {
    //         email: 'achraf@gmail.com',
    //         password: '1234',
    //     };
    //     User.findOne.mockResolvedValue(user);
    //     bcrypt.compare.mockResolvedValue(true);
    //     const req = {
    //         body: {
    //             email: 'achraf@gmail.com',
    //             password: '1234',
    //         },
    //     };
    //     const res = {
    //         status: jest.fn().mockReturnThis(),
    //         json: jest.fn(),
    //     };
    //     await loginCLient(req, res);

    //     expect(res.status).toHaveBeenCalledWith(200);
    //     expect(res.json).toHaveBeenCalledWith({
    //         user,
    //     });
    // });

    it('should send a 400 status and error message if user is not found', async () => {
        Client.findOne.mockResolvedValue(null);

        const req = {
            body: {
                email: 'achraf@gmail.com',
                password: '1234',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginCLient(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'invalid client Data',
        });
    });

    it('should send a 400 status and error message if password is invalid', async () => {
        const user = {
            email: 'test@example.com',
            password: 'hashedPassword',
          };
          Client.findOne.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        const req = {
            body: {
                email: 'test@example.com',
                password: 'password',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await loginCLient(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'invalid client Data',
        });
    });
});