import express, {type Application, type Request, type Response} from 'express';
import "dotenv/config";

const app:Application = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})