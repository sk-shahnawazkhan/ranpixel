export default async function handler(req, res) {
  const ACCESS_KEY = process.env.ACCESS_KEY;

  if (!ACCESS_KEY) {
    return res.status(500).json({ error: "Access key is not available!" });
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${ACCESS_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.errors || "Error while fetching data" });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server error: " + error.message });
  }
}
