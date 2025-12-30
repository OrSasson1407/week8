const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");

// מפתח סודי לחתימת ה-Token
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!";

app.use(express.json());
// שורה זו מגישה את הקבצים הסטטיים (כמו React ו-login.html)
app.use(express.static('public'));

// פונקציה שמחזירה מידע סודי (רק למשתמש מחובר)
const index = (req, res) => {
    res.json({ data: 'secret data' });
}

// Middleware לבדיקה האם המשתמש מחובר (יש לו Token תקין)
const isLoggedIn = (req, res, next) => {
    // בודק אם יש כותרת Authorization
    if (req.headers.authorization) {
        // מפרק את הכותרת כדי לקבל את ה-Token (בלי המילה Bearer)
        const token = req.headers.authorization.split(" ")[1];
        try {
            // אימות ה-Token מול המפתח הסודי
            const data = jwt.verify(token, key);
            console.log('The logged in user is: ' + data.username);
            return next(); // הכל תקין, ממשיכים לפונקציה הבאה
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    } else {
        return res.status(403).send('Token required');
    }
}

// פונקציית ההתחברות - יצירת Token
const processLogin = (req, res) => {
    // בדיקת שם משתמש וסיסמה קבועים מראש
    if (req.body.username == 'guest' && req.body.password == '123456') {
        const data = { username: req.body.username };
        // יצירת ה-Token החתום
        const token = jwt.sign(data, key);
        res.status(201).json({ token });
    } else {
        res.status(404).send('Invalid username and/or password');
    }
}

// הגדרת הנתיבים
app.post('/login', processLogin);
app.get('/', isLoggedIn, index); // הנתיב הראשי מוגן ע"י isLoggedIn

// הפעלת השרת על פורט 89
app.listen(89, () => {
    console.log('Server running on http://localhost:89');
});