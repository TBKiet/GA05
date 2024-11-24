// controller.js
const { getMovieLists } = require('./service');

const renderMovieList = async (req, res) => {
    try {
        const { showingMovieList, upcomingMovieList } = await getMovieLists();

        res.render("home", {
            layout: "main",
            showingMovies: showingMovieList,
            upcomingMovies: upcomingMovieList
        });
    } catch (error) {
        console.error('Error loading movies:', error);
        res.status(500).send("Error loading movies.");
    }
};

module.exports = { renderMovieList };
