function getMovieListToDisplay(movies) {
    // Chuyển đổi dữ liệu movies theo dạng bạn muốn hiển thị
    return movies.map(movie => ({
        id: movie.props.pageProps.res.movieData.id,
        title: movie.props.pageProps.res.movieData.name_vn, // Hoặc name_en tùy thuộc vào ngôn ngữ
        image_url: movie.props.pageProps.res.movieData.image,
        rating: movie.props.pageProps.res.movieData.ratings,
        age: movie.props.pageProps.res.movieData.limitage_vn
    }));
}

function getShowingMovieListToDisplay(movies) {
    // convert movie data to an object that has movie.props.pageProps.res.movieData.release_date <= today
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return movies
        .filter(movie => new Date(movie.props.pageProps.res.movieData.release_date) <= new Date(today))
        .map(movie => ({
            id: movie.props.pageProps.res.movieData.id,
            title: movie.props.pageProps.res.movieData.name_vn, // Or name_en
            image_url: movie.props.pageProps.res.movieData.image,
            rating: movie.props.pageProps.res.movieData.ratings,
            age: movie.props.pageProps.res.movieData.limitage_vn
        }));
}

function getUpcomingMovieListToDisplay(movies) {
    // convert movie data to an object that has movie.props.pageProps.res.movieData.release_date > today
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    return movies
        .filter(movie => new Date(movie.props.pageProps.res.movieData.release_date) > new Date(today))
        .map(movie => ({
            id: movie.props.pageProps.res.movieData.id,
            title: movie.props.pageProps.res.movieData.name_vn, // Or name_en
            image_url: movie.props.pageProps.res.movieData.image,
            rating: movie.props.pageProps.res.movieData.ratings,
            age: movie.props.pageProps.res.movieData.limitage_vn
        }));
}

module.exports = {getMovieListToDisplay, getShowingMovieListToDisplay, getUpcomingMovieListToDisplay};