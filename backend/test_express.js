try {
    const express = require('express');
    console.log('EXPRESS_LOADED');
    const app = express();
    app.listen(5001, () => {
        console.log('LISTENING_ON_5001');
    });
} catch (err) {
    console.error('ERROR:', err.message);
}
