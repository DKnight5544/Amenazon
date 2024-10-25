

const _defaultCashtags = ["dboi2lit", "aimeemartin83", "DougRaley", "rebeccakayknight", "DorkyDomains"];
let _cashtags; 
function begin() {

    var script = document.createElement('script');
    script.src = 'index.js?v=' + new Date().getTime();
    document.body.appendChild(script);

    document.getElementById('submitButton').addEventListener('click', handleSubmit);

    document.getElementById('inputBox').addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    });

    updateCashtagList();
};

function updateCashtagList() {
    let param = window.location.search.substring(1);
    _cashtags = param ? decodeCashtags(param) : _defaultCashtags;
    let cashtagList = document.getElementById('cashtagList');
    cashtagList.innerHTML = '<ul>' + _cashtags.slice(0, 5).map(cashtag => '<li>$' + cashtag + '</li>').join('') + '</ul>';
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function encodeCashtags(cashtags) {
    const cashtagsString = cashtags.join('|');
    const encoded = btoa(cashtagsString);
    return reverseString(encoded);
}

function decodeCashtags(encodedString) {
    try {
        const reversed = reverseString(encodedString);
        const decoded = atob(reversed);
        return decoded.split('|');
    } catch (e) {
        return [];
    }
}
function handleSubmit() {

    let newCashtag = document.getElementById('inputBox')
        .value
        .trim()
        .replace(/\$/g, '');

    if (newCashtag) {
        if (_cashtags.some(cashtag => cashtag.toLowerCase() === newCashtag.toLowerCase())) {
            alert("That cashtag is already on the list!");
            document.getElementById('inputBox').value = '';
        } else {
            _cashtags.push(newCashtag);

            if (_cashtags.length > 5) {
                _cashtags.shift();
            }

            const encodedCashtags = encodeCashtags(_cashtags);
            window.location.href = window.location.pathname + '?' + encodedCashtags;
        }
    }
}


