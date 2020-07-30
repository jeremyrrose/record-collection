// set DOM vars
const $artistsList = $('.artistsList') // contains list of artists
const $info = $('.info') // contains artist info
const $records = $('.records') // contains records
const $addArtistButton = $('.artistControls button') // "Add Artist" button
const $addRecordButton = $('.recordControls button') // "Add Record" button

const url = 'http://localhost:3000'

// gets artists from API and adds artist buttons
const getArtists = async () => {

    const response = await fetch(url + '/artists').then(res => res.json())

    response.forEach(artist => {
        const $artistSelector = $('<div>')
            .addClass('artistSelector')
            .attr('id',artist._id)
            .text(artist.name)
            .on('click', showOneArtist)

        $artistsList.append($artistSelector)
    })
}

// fetches one artist and artist's records to update $info and $records
const showOneArtist = (event) => {

    console.log('use this: ', event.target.id) // look in your console!

    $info
        .empty()
        .append(
            $('<h2>')
                .text('Artist Would Be Here')
            )
        .append(
            $('<p>')
                .text('... but we have yet to write the function.')
            )

    $records
        .empty()
        .append(
            $('<p>')
                .text('And records would go here!')
        )
}

// getArtists()