const searchPhone = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    const errorMeassege = document.getElementById('error-meassege');
    if (searchText === '') {
        errorMeassege.style.display = 'block';
    }
    else {
        errorMeassege.style.display = 'none';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        const res = await fetch(url);
        const data = await res.json();
        if (data.status === true) {
            displaySearchResult(data.data.slice(0, 20));
        }
        else {
            errorMeassege.style.display = 'block';
        }
    }

    // load data
}

const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card rounded">
             <div><img src="${phone.image}" class="img-fluid" alt="..."></div>
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick ="loadPhoneDeail('${phone.slug}')" class="btn btn-primary">Explore</button> 
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    })
}

const loadPhoneDeail = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;

    const res = await fetch(url);
    const data = await res.json();
    diplayPhoneDetail(data.data);


}
const diplayPhoneDetail = phone => {
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release date'}</p>
                <p class="storage-text">Storage: ${phone.mainFeatures.storage}</p>
                <p class="chipset-text">ChipSet: ${phone.mainFeatures.chipSet}</p>
                <p class="sensor-text">Sensor: ${phone.mainFeatures.sensors}</p>
                <p class="others-text">Others: ${phone.others.WLAN}  ${phone.others.Bluetooth} ${phone.others.GPS}</p>
            </div>
    `;
    phoneDetails.appendChild(div);
}