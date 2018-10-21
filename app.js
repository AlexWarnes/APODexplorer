'use strict';

function startUp(){
    getDataFromAPI(displayAPODs);
    loadMore();
}

function getDataFromAPI(callback) {
        const settings = {
            url: 'https://api.nasa.gov/planetary/apod',
            data: {
                api_key: 'e4H0MXzQSJYZ2uovfupfXiHWILcpqsN4VJscZ6Yn',
                count: 5
            },
            dataType: 'JSON',
            method: 'GET',
            success: callback
        };
        $.ajax(settings);
}

function renderApodCard(apod) {
    switch (apod.media_type) {
        case 'image':
            return `
                <li class="apod-card">
                    <div class="imgBox">
                        <img class="apod-media" src=${apod.url} alt=${apod.title}>
                    </div>
                    <div class="apod-details">
                        <div class="apod-details-banner">
                            <p class="detail apod-title">${apod.title}</p>
                            <p class="detail apod-date">${apod.date}</p>
                        </div>
                        <div class="apod-details-main">
                            <p class="detail apod-author">
                                ${'copyright' in apod ? `Copyright ${apod.copyright}` : ' '}
                            </p>
                            <p class="apod-description">${apod.explanation}</p>
                        </div>
                    </div>
                </li>`;
        case 'video':
            return `
                <li class="apod-card">
                    <div class="apod-details">
                        <div class="apod-details-banner error-banners">
                            <p class="detail apod-title">
                                <i class="fas fa-exclamation-triangle error-icon"></i>
                                UNABLE TO LOAD VIDEO
                            </p>
                            <p class="detail apod-date">
                                <a class="nav-link" href=${apod.url} target="_blank" rel="noopener noreferrer">
                                    <i class="fas fa-external-link-alt" error-icon></i>
                                    Open video in a new tab
                                </a>    
                            </p>
                        </div>
                    </div>
                </li>`;
        default:
            return `
            <li class="apod-card">
                <div class="apod-details">
                    <div class="apod-details-banner error-banners">
                        <p class="detail apod-title">
                            <i class="fas fa-exclamation-triangle error-icon"></i>
                            ERROR
                        </p>
                        <p class="detail apod-date">
                            <i class="fas fa-space-shuttle error-icon"></i>
                            We have experienced an anomoly...
                        </p>
                    </div>
                </div>
            </li>`;
    }
    
}

function displayAPODs(data) {
    const apodList = data.map(apod => renderApodCard(apod))
    $('.apod-feed').append(apodList);
}

function loadMore(){
    $('.load-more-btn').on('click', (e) => {
        e.preventDefault();
        console.log('button clicked to load more');
        getDataFromAPI(displayAPODs)
    })
}

$(startUp)