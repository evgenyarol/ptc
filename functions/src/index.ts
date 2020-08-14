import { ImageUpload } from './controllers/image-upload.controller';
import {Connections} from "./utils/connections";
import {ProfileController} from "./controllers/profile.controller";
import {AdminController} from "./controllers/admin.controller";
import cors from "cors";
import {AuthService} from './services/auth.service';
import {EventController} from './controllers/event.controller';
import {EventGetController} from './controllers/eventGet.controller';
import {OrderController} from './controllers/order.controller';
import {EventRegistrationController} from "./controllers/eventReg.controller";


const  express = require ("express");
const bodyParser = require("body-parser");

const admin = require('firebase-admin');
const functions = require('firebase-functions');

const serviceAccount = require("../serviceAccountKey.json");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "play-the-city.appspot.com/"
});

Connections.dbConnection = admin.firestore();
Connections.avatarBucket = admin.storage;
Connections.admin = admin;

app.use("/api/events", new EventGetController().getRouter());
app.use("/api/upload", new ImageUpload().getRouter());

app.use(async (req: any, res: any, next: any) => {
    if (req._parsedUrl.pathname.includes("/api/admin") || req._parsedUrl.pathname.includes("/docs")) {
        next();
        return;
    }

    // const authorization = req.header("Authorization");

    // if (authorization && authorization.includes("Bearer")) { 
    //     try {
    //        const payload: any = await AuthService.checkAuthorization(authorization ? authorization.substring(7) : "");
    //        next();
    //        return;
    //     } catch (e) {
    //        res.status(401).send("Unauthorized.");
    //         return;
    //     }
    // }

    // try {
    //     const payload: any = await AuthService.checkFirebaseAuthorization(authorization ? authorization : "");
    // } catch (e) {
    //     res.status(401).send("Unauthorized.");
    //     return;
    // }

    next();
});
app.use("/api/events", new EventController().getRouter());
app.use("/api/orders", new OrderController().getRouter());
app.use("/api/profiles", new ProfileController().getRouter());
app.use("/api/admin", new AdminController().getRouter());
app.use("/api/event/registration", new EventRegistrationController().getRouter());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

exports.widgets = functions.https.onRequest(app);
