import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            adult: false,
            backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
            genre_ids: [27, 53],
            id: 760161,
            original_language: 'en',
            original_title: 'Orphan: First Kill',
            overview:
              'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
            popularity: 7115.298,
            poster_path: '/wSqAXL1EHVJ3MOnJzMhUngc8gFs.jpg',
            release_date: '2022-07-27',
            title: 'Orphan: First Kill',
            video: false,
            vote_average: 6.8,
            vote_count: 805,
          },
        ],
        total_pages: 35297,
        total_results: 705923,
      })
    );
  }),
  rest.get('https://api.themoviedb.org/3/movie/760161', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        adult: false,
        backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
        belongs_to_collection: {
          id: 760193,
          name: 'Orphan Collection',
          poster_path: '/q8icPVro0MYLTXbttS1KMpdQntP.jpg',
          backdrop_path: '/nsslKmD5WIYhJ0fO5MDeE6ZjIKp.jpg',
        },
        budget: 0,
        genres: [
          {
            id: 27,
            name: 'Horror',
          },
          {
            id: 53,
            name: 'Thriller',
          },
        ],
        homepage: '',
        id: 760161,
        imdb_id: 'tt11851548',
        original_language: 'en',
        original_title: 'Orphan: First Kill',
        overview:
          'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
        popularity: 7115.298,
        poster_path: '/wSqAXL1EHVJ3MOnJzMhUngc8gFs.jpg',
        production_companies: [
          {
            id: 1786,
            logo_path: '/joLFuCWg9e2lweYnFQtRPJKSLlI.png',
            name: 'Dark Castle Entertainment',
            origin_country: 'US',
          },
          {
            id: 8147,
            logo_path: '/q6HOAdSNgCbeOqwoMVRc6REgbXF.png',
            name: 'Entertainment One',
            origin_country: 'CA',
          },
          {
            id: 63576,
            logo_path: '/4qMMMs4smEdD2fjoLLSSleRjG9J.png',
            name: 'Eagle Vision',
            origin_country: 'CA',
          },
        ],
        production_countries: [
          {
            iso_3166_1: 'CA',
            name: 'Canada',
          },
          {
            iso_3166_1: 'US',
            name: 'United States of America',
          },
        ],
        release_date: '2022-07-27',
        revenue: 9572765,
        runtime: 99,
        spoken_languages: [
          {
            english_name: 'English',
            iso_639_1: 'en',
            name: 'English',
          },
          {
            english_name: 'Estonian',
            iso_639_1: 'et',
            name: 'Eesti',
          },
        ],
        status: 'Released',
        tagline: "There's always been something wrong with Esther.",
        title: 'Orphan: First Kill',
        video: false,
        vote_average: 6.8,
        vote_count: 805,
        videos: {
          results: [
            {
              iso_639_1: 'en',
              iso_3166_1: 'US',
              name: 'Official Trailer',
              key: '_uX6of3vBu0',
              site: 'YouTube',
              size: 1080,
              type: 'Trailer',
              official: true,
              published_at: '2022-07-13T14:06:35.000Z',
              id: '62cee190d75bd601f9068c07',
            },
          ],
        },
      })
    );
  }),
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        results: [
          {
            adult: false,
            backdrop_path: '/nmGWzTLMXy9x7mKd8NKPLmHtWGa.jpg',
            genre_ids: [16, 12, 35, 14],
            id: 438148,
            original_language: 'en',
            original_title: 'Minions: The Rise of Gru',
            overview:
              'A fanboy of a supervillain supergroup known as the Vicious 6, Gru hatches a plan to become evil enough to join them, with the backup of his followers, the Minions.',
            popularity: 1667.11,
            poster_path: '/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg',
            release_date: '2022-06-29',
            title: 'Minions: The Rise of Gru',
            video: false,
            vote_average: 7.6,
            vote_count: 2076,
          },
        ],
        total_pages: 2,
        total_results: 34,
      })
    );
  }),
];
