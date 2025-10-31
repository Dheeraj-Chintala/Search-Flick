import axios from "axios";
import Search from "../models/Search.js";

export const handleSearch = async (req, res) => {
  const { term } = req.body;
  const userId = req.user._id;

  if (!term) return res.status(400).json({ message: "Search term required" });

  try {
    // Save search record
    await Search.create({ userId, term });

    // Call Unsplash API
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query: term, per_page: 12 },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    res.json({
      term,
      results: response.data.results.map((img) => ({
        id: img.id,
        url: img.urls.small,
        alt: img.alt_description,
      })),
    });
  } catch (error) {
    console.error("Unsplash API error:", error.message);
    res.status(500).json({ message: "Error fetching images" });
  }
};

export const getTopSearches = async (req, res) => {
  try {
    const top = await Search.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json(top);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch top searches" });
  }
};
