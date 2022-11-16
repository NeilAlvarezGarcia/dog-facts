async function getDog() {
    try {
        const response = await fetch('/api/v1/random/dog');
        const dogData = await response.json();
        if (dogData.status === 'success') return printDog(dogData.data);

        throw new Error()
    } catch(err) {
        printError();
    }


}

function printDog({img, facts}) {
    const imgElementContainer = document.querySelector('#dog-image-container');
    const imgElement = document.createElement('img');
    const listContainer = document.querySelector('ol');
    
    imgElement.src = img;
    imgElement.id = 'dog-image';
    img.alt = 'dog img';

    
    facts.forEach(fact => {
        const listElement = document.createElement('li');
        listElement.textContent = fact;
        
        listContainer.appendChild(listElement);
    });

    imgElementContainer.appendChild(imgElement)
}

function printError() {
    document.querySelector('#dog').style.display = 'none';
    const error = document.querySelector('#error p');

    error.textContent = 'Ocurred an error while fetching the dog data. Please come back later.'
}

getDog()