const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}

const displaySearchResult = (phones) => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="...">
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

const loadPhoneDeail = phoneId => {
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => diplayPhoneDetail(data.data))
}
const diplayPhoneDetail = phone => {
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.name}</h5>
                <p> ${phone.releaseDate ? phone.releaseDate : 'No Release date'}</p>
                <p class="storage-text">Storage: ${phone.mainFeatures.storage}</p>
                <p class="chipset-text">ChipSet: ${phone.mainFeatures.chipSet}</p>
                <p class="sensor-text">Sensor: ${phone.mainFeatures.sensors}</p>
                <p class="others-text">Others: ${phone.others.WLAN}  ${phone.others.Bluetooth} ${phone.others.GPS}</p>
            </div>
    `;
    phoneDetails.appendChild(div);
}