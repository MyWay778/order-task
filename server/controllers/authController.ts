import { Request, Response } from 'express';
import users from '../data/users.json';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fsPromises from 'fs/promises';
import path from 'path';
import { ITokenPayload } from '../typings/jwt';

export async function handleLogin(req: Request, res: Response): Promise<Response> {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: 'Не заполнены обязательные поля' });
  }

  const user = users.find((u) => u.login === login);

  if (user) {
    const success = await bcrypt.compare(password, user.password);
    if (success) {
      const accessEnvToken = process.env.ACCESS_TOKEN_SECRET;
      const refreshEnvToken = process.env.REFRESH_TOKEN_SECRET;
      let accessToken = '';

      if (accessEnvToken && refreshEnvToken) {
        accessToken = jwt.sign({ user: user.id }, accessEnvToken, {
          expiresIn: '30s'
        });

        const refreshToken = jwt.sign({ user: user.id }, refreshEnvToken, {
          expiresIn: '1d'
        });

        user.refreshToken = refreshToken;
        fsPromises.writeFile(
          path.join(__dirname, '..', 'data', 'users.json'),
          JSON.stringify(users)
        );

        res.cookie('jwt', refreshToken, {
          httpOnly: true,
          // sameSite: 'none',
          // secure: true,
          maxAge: 24 * 60 * 60 * 1000
        });
      }
      return res.json({ id: user.id, name: user.name, role: user.role, accessToken });
    }
  }

  return res.status(403).json({ message: 'Неверный логин / пароль' });
}

export const handleAuth = (req: Request, res: Response): void => {
  const { user } = req;
  if (user) {
    const foundUser = users.find((u) => u.id === Number(user));
    if (foundUser) {
      res.json({ id: foundUser.id, name: foundUser.name, role: foundUser.role });
    }
  }
};

export const handleRefreshToken = (req: Request, res: Response): Response | void => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt as string;

  const foundUser = users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403);

  if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(500);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded || foundUser.id !== Number((decoded as ITokenPayload).user))
      return res.sendStatus(403);

    if (!process.env.ACCESS_TOKEN_SECRET) return res.sendStatus(500);

    const accessToken = jwt.sign(
      { username: (decoded as ITokenPayload).user },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    if (!process.env.REFRESH_TOKEN_SECRET) return res.sendStatus(500);

    const refreshToken = jwt.sign({ user: foundUser.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d'
    });

    foundUser.refreshToken = refreshToken;
    fsPromises.writeFile(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(users));

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // sameSite: 'none',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ id: foundUser.id, name: foundUser.name, role: foundUser.role, accessToken });
  });
};

export const handleLogout = (req: Request, res: Response): Response => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt as string;

  const foundUser = users.find((u) => u.refreshToken === refreshToken);
  if (foundUser) {
    foundUser.refreshToken = '';
    fsPromises.writeFile(path.join(__dirname, '..', 'data', 'users.json'), JSON.stringify(users));
  }

  res.clearCookie('jwt', {
    httpOnly: true
    // sameSite: 'none',
    // secure: true
  });
  return res.sendStatus(204);
};
