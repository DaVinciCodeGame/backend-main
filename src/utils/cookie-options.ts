import { CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: '.davinci-code.online',
};

export default cookieOptions;
