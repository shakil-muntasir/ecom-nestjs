import 'dotenv/config';
import { cleanEnv, str, bool, port } from 'envalid';

export default cleanEnv(process.env, {
    DB_HOST: str({ default: 'localhost' }),
    DB_PORT: port({ default: 5432 }),
    DB_USERNAME: str({ default: 'postgres' }),
    DB_PASSWORD: str(),
    DB_DATABASE: str(),
    DB_SYNC: bool({ default: false })
});
 