var sortedArrays = {};

function initializeSimilarityEngine(rawData){

	sortedArrays['average rating'] = sortArrayByUnit(rawData, 'average rating');
	//console.log(getKSimilarMovies(sortedArrays['average rating'][1014], 'average rating', 5));
}

function sortArrayByUnit(array, unit){
	array.sort(function(a,b){return a[unit]-b[unit];});
	return array;
}


function getKSimilarMovies(movie, unit, k){
	return getKclosest(sortedArrays[unit], movie, k, sortedArrays[unit].length, 'average rating')
}

function formattedSimilarMovies(movie, unit, displayUnit, k){
	//console.log(displayUnit);
	similarMovies = getKSimilarMovies(movie, unit, k);
	var formattedSimilarMovies = [];
	formattedSimilarMovies.push({'text': movie['title'], 'count': movie[displayUnit]});
	similarMovies.forEach(function(movie){
		var movieInfo = {};
		movieInfo['text'] = movie.title;
		movieInfo.count = movie[displayUnit];
		formattedSimilarMovies.push(movieInfo);
	})
	return formattedSimilarMovies;
}

function crossOverPoint(a, l  , h , x, unit)
     {
 
         if(l>h) 
             return -1;
 
         if(a[h][unit]<=x[unit])
             return h;
 
         if(x[unit]<a[l][unit])
             return l;
 
 
         mid = Math.floor(l + (h-l)/2);
 
         if(a[mid][unit]<=x[unit] && a[mid+1][unit]>x[unit])
         {
             return mid;
         }
         if(a[mid][unit]<=x[unit])
         {
             return crossOverPoint(a, mid+1, h, x, unit);
         }
         else
         {
            return crossOverPoint(a,l, mid-1, x, unit); 
         }
     }

// This function prints k closest elements to x in arr[].
// n is the number of elements in arr[]
function getKclosest(arr, x, k, n, unit)
{
    // Find the crossover point
    var similarMovies = [];
    var l = crossOverPoint(arr, 0, n-1, x, unit);
    console.log(l);
    var r = l+1;   // Right index to search
    var count = 0; // To keep track of count of elements already printed
 
    // If x is present in arr[], then reduce left index
    // Assumption: all elements in arr[] are distinct
    if (arr[l] == x) l--;
 
    // Compare elements on left and right of crossover
    // point to find the k closest elements
    while (l >= 0 && r < n && count < k)
    {
        if (x[unit] - arr[l][unit] < arr[r][unit] - x[unit])
            similarMovies.push(arr[l--]);
        else
            similarMovies.push(arr[r++]);
        count++;
    }
 
    // If there are no more elements on right side, then
    // print left elements
    while (count < k && l >= 0)
        similarMovies.push(arr[l--][unit]), count++;
 
    // If there are no more elements on left side, then
    // print right elements
    while (count < k && r < n)
        similarMovies.push(arr[r++][unit]), count++;

    return similarMovies;
}