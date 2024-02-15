async function getMovieInfo() {
    const datas = await api.runAsyncOnBackendWithManualTransactionHandling(async () => {
        const notes = api.getNotesWithLabel('movieRank');
        const datas = [];

        for (const note of notes) {
            const name = note.getLabelValue('movieName');
            const rank = note.getLabelValue('movieRank');
            const watch = note.getLabelValue('watchTime');
            const path = note.getBestNotePathString(note.noteId);
            
            if (name && rank) {
                datas.push({name, rank, watch, path});
            }
        }

        return datas;
    });

    // For the rank info, sort it from high to low
    datas.sort((a, b) => a.rank > b.rank ? -1 : 1);
    var str1 = '';    
    var number = 1;
    for (const data of datas) {
        str1 = str1 + '<tr>';
        str1 = str1 + '<td class="num">' + 'No.' + number + '</td>';
        str1 = str1 + '<td class="name">' + '<a class="reference-link" href="#' + data.path + '">' + data.name + '</a></td>';
        str1 = str1 + '<td class="rank">' + data.rank + '</td>';
        str1 = str1 + '</tr>';
        number++;
    }

    // For the watch info, sort if by watch time
    datas.sort((a, b) => a.watch > b.watch ? -1 : 1);
    var str2 = '';
    for (const data of datas) {
        str2 = str2 + '<tr>';
        str2 = str2 + '<td class="watch">' + data.watch + '</td>';
        str2 = str2 + '<td class="name">' + '<a class="reference-link" href="#' + data.path + '">' + data.name + '</a></td>';
        str2 = str2 + '</tr>';
        number++;
    }
    
     return {str1, str2};
}

var {str1, str2} = await getMovieInfo();

document.getElementById("table-rank").innerHTML = str1;
document.getElementById("table-watch").innerHTML = str2;