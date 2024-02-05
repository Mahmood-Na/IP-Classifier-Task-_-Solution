const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function findIPAddressClass(ipAddress) {
    var octets = ipAddress.split('.');

    // Check if the length of octets is less than 4
    if (octets.length !== 4) {
        return "Invalid IP address format. Please enter a valid IP address with 4 octets separated by dots.";
    }

    // Convert each octet to an integer and check if it's within the valid range (0-255)
    for (let i = 0; i < 4; i++) {
        let octet = parseInt(octets[i]);
        if (isNaN(octet) || octet < 0 || octet > 255) {
            return "Invalid octet value. Please enter valid numbers between 0 and 255 for each octet.";
        }
    }

    var firstOctet = parseInt(octets[0]);

    if (firstOctet >= 1 && firstOctet <= 126) {
        return "Class A";
    } else if (firstOctet == 128) {
        return "Special case: Loopback (localhost)";
    } else if (firstOctet >= 128 && firstOctet <= 191) {
        return "Class B";
    } else if (firstOctet >= 192 && firstOctet <= 223) {
        return "Class C";
    } else if (firstOctet >= 224 && firstOctet <= 239) {
        return "Class D";
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        return "Class E";
    } else {
        return "Invalid IP Address";
    }
}

function isPrivateIPAddress(ipAddress) {
    var octets = ipAddress.split('.');
    var firstOctet = parseInt(octets[0]);

    // Check if the IP address falls within the private IP address ranges
    if (
        (firstOctet === 10) || // Class A private network
        (firstOctet === 172 && parseInt(octets[1]) >= 16 && parseInt(octets[1]) <= 31) || // Class B private network
        (firstOctet === 192 && parseInt(octets[1]) === 168) // Class C private network
    ) {
        return true;
    } else {
        return false;
    }
}

rl.question('Enter an IP address: ', (ipAddress) => {
    var ipClass = findIPAddressClass(ipAddress);
    var isPrivate = isPrivateIPAddress(ipAddress);

    var result = "The class of the entered IP address is: " + ipClass;
    if (isPrivate) {
        result += "\nThis IP address is a private address.";
    } else {
        result += "\nThis IP address is a public address.";
    }

    process.stdout.write(result + "\n");
    rl.close();
});
