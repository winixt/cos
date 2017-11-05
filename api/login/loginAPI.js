import { extractToken } from '../utils';
import Login from './login';

export function mountLoginAPI(server, token) {
  const login = new Login({ token });

  server.post('/signIn', async (req, res) => {
    const data = await login.signIn(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
  server.post('/register', async (req, res) => {
    const data = await login.register();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
  });
  server.post('/signOut', async (req, res) => {
    const accessToken = extractToken(req.headers.authorization)[1];
    const result = await login.signOut(accessToken);
    res.send(result);
  });
}

