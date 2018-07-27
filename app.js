'use strict';

const STORE = {
    testData: [
        {
        "date": "2015-12-28",
        "explanation": "The booster has landed. Spaceflight took a step toward the less expensive last week when the first stage of a Falcon 9 rocket set down on a landing pad not far from its Florida launch.  Previously, most rocket stages remained unrecovered -- with the significant exception of the Space Shuttles landing on a runway and their solid rocket boosters being fished back from the sea.  The landing occurred while the Falcon 9 second stage continued up to launch several communications satellites into low Earth orbit. The controlled landing, produced by SpaceX, was the first of its kind, but followed a booster landing last month by Blue Origin that did not involve launching satellites. Boeing and SpaceX were selected last year by NASA to launch future astronauts to the International Space Station. The pictured rocket booster will be analyzed for wear and reusability, but then is scheduled to be retired.   Follow APOD on: Facebook,  Google Plus, or Twitter",
        "media_type": "video",
        "service_version": "v1",
        "title": "Falcon 9 First Stage Landing",
        "url": "https://www.youtube.com/embed/ZCBE8ocOkAQ?rel=0"
        
        },
        {
        "copyright": "Fred Bruenjes",
        "date": "2004-08-20",
        "explanation": "Comet dust rained down on planet Earth last week, streaking through dark skies in the annual Perseid meteor shower. So, while enjoying the anticipated space weather, astronomer Fred Bruenjes recorded a series of many 30 second long exposures spanning about six hours on the night of August 11/12 using a wide angle lens. Combining those frames which captured meteor flashes, he produced this dramatic view of the Perseids of summer. Although the comet dust particles are traveling parallel to each other, the resulting shower meteors clearly seem to radiate from a single point on the sky in the eponymous constellation Perseus. The radiant effect is due to perspective, as the parallel tracks appear to converge at a distance. Bruenjes notes that there are 51 Perseid meteors in the composite image, including one seen nearly head-on.",
        "hdurl": "https://apod.nasa.gov/apod/image/0408/perseidMeteors_bruenjes_big.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Raining Perseids",
        "url": "https://apod.nasa.gov/apod/image/0408/perseidMeteors_bruenjes_c1.jpg"
        },
        {
        "date": "2001-01-02",
        "explanation": "As the robot Cassini spacecraft rounds Jupiter on its way toward Saturn, it has taken a sequence of images of the gas giant with its four largest moons.  Previously released images have highlighted Ganymede and Io.  Pictured above are the two remaining Galilean satellites: Europa and Callisto.  Europa is the bright moon superposed near Jupiter's Great Red Spot, while Callisto is the dark moon near the frame edge.  Callisto is so dark that it would be hard to see here if its brightness was not digitally enhanced.  Recent evidence indicates that both moons hold salt-water seas under surface ice that might be home to extra-terrestrial life.  By noting the times that moons disappeared and reappeared behind Jupiter in 1676, Ole Roemer was able to make the first accurate estimation of the speed of light.",
        "hdurl": "https://apod.nasa.gov/apod/image/0101/JupEuroCall_cassini_big.gif",
        "media_type": "image",
        "service_version": "v1",
        "title": "Jupiter, Europa, and Callisto",
        "url": "https://apod.nasa.gov/apod/image/0101/JupEuroCall_cassini.jpg"
        },
        {
        "date": "2017-01-08",
        "explanation": "How can a round star make a square nebula?  This conundrum comes to light when studying  planetary nebulae like IC 4406.  Evidence indicates that IC 4406 is likely a hollow cylinder, with its square appearance the result of our vantage point in viewing the cylinder from the side.  Were IC 4406 viewed from the top, it would likely look similar to the Ring Nebula.  This representative-color picture is a composite made by combining images taken by the Hubble Space Telescope in 2001 and 2002. Hot gas flows out the ends of the cylinder, while filaments of dark dust and molecular gas lace the bounding walls.  The star primarily responsible for this interstellar sculpture can be found in the planetary nebula's center.  In a few million years, the only thing left visible in IC 4406 will be a fading white dwarf star.",
        "hdurl": "https://apod.nasa.gov/apod/image/1701/ic4406_hubble_2859.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "IC 4406: A Seemingly Square Nebula",
        "url": "https://apod.nasa.gov/apod/image/1701/ic4406_hubble_960.jpg"
        },
        {
        "copyright": "Adam Block",
        "date": "2017-03-11",
        "explanation": "Riding high in the constellation of Auriga, beautiful, blue vdB 31 is the 31st object in Sidney van den Bergh's 1966 catalog of reflection nebulae. It shares this well-composed celestial still life with dark, obscuring clouds recorded in Edward E. Barnard's 1919 catalog of dark markings in the sky. All are interstellar dust clouds, blocking the light from background stars in the case of Barnard's dark nebulae. For vdB 31, the dust preferentially reflects the bluish starlight from embedded, hot, variable star AB Aurigae. Exploring the environs of AB Aurigae with the Hubble Space Telescope has revealed the several million year young star is itself surrounded by flattened dusty disk with evidence for the ongoing formation of a planetary system. AB Aurigae is about 470 light-years away. At that distance this cosmic canvas would span about four light-years.",
        "hdurl": "https://apod.nasa.gov/apod/image/1703/vdb31AdamBlock.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Reflections on vdB 31",
        "url": "https://apod.nasa.gov/apod/image/1703/vdb31AdamBlock_s1024.jpg"
        }
    ]

}

function startUp(){
    getDataFromAPI(displayAPODs);
    loadMore();
    // displayAPODs(STORE.testData);
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
                    <img class="apod-media" src=${apod.url} alt=${apod.title}>
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