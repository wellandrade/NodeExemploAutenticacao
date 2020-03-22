function generatePassword() {
    const chars = 'qwertyuiopçlkjhgfdsazxcvbnm0123456789MNBVCXZASDFGHJKLÇPOIUYTREWQ';
    var pass = '';

    for (var i = 0; i < 10; i++) {
        pass += chars.charAt(Math.random() * 61);
    }   

    return pass;
};

module.exports = {  generatePassword }