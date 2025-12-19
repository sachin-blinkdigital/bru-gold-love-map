/**
 * Coffee Spots Data
 *
 * Easy to customize - add, edit, or remove coffee spots here
 *
 * Each spot has:
 * - id: unique identifier
 * - name: café name
 * - subtitle: display text
 * - type: 'gold' | 'white' | 'special' (determines pin style)
 * - categories: array of categories for filtering
 * - lat, lng: coordinates
 * - distance: display distance
 * - openUntil: closing time
 * - popularity: popularity level
 * - address: full address
 * - images: array of image URLs
 * - zomatoLink: booking link
 * - mapsLink: Google Maps link
 * - isPopup: (optional) true for pop-up locations
 * - popupMessage: (optional) special message for pop-ups
 */

const coffeeSpots = [
  {
    id: 1,
    name: "Third Wave Coffee",
    subtitle: "Coffee Date Spot #1",
    type: "gold",
    categories: ["cozy", "scenic"],
    lat: 19.0596,
    lng: 72.8295,
    distance: "1.2 km",
    openUntil: "11:00 PM",
    popularity: "High",
    address: "Ground Floor, Linking Road, Bandra West, Mumbai 400050",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/third-wave-coffee-roasters-bandra-west",
    mapsLink: "https://maps.google.com/?q=Third+Wave+Coffee+Bandra"
  },
  {
    id: 2,
    name: "Blue Tokai Coffee",
    subtitle: "Coffee Date Spot #2",
    type: "gold",
    categories: ["cute", "budget"],
    lat: 19.0625,
    lng: 72.8362,
    distance: "0.8 km",
    openUntil: "10:30 PM",
    popularity: "Medium",
    address: "Hill Road, Near Lucky Restaurant, Bandra West, Mumbai 400050",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/blue-tokai-coffee-roasters-bandra-west",
    mapsLink: "https://maps.google.com/?q=Blue+Tokai+Coffee+Bandra"
  },
  {
    id: 3,
    name: "Starbucks Reserve",
    subtitle: "Coffee Date Spot #3",
    type: "gold",
    categories: ["scenic", "rooftop"],
    lat: 19.0544,
    lng: 72.8402,
    distance: "2.1 km",
    openUntil: "12:00 AM",
    popularity: "Very High",
    address: "14th Road, Khar West, Mumbai 400052",
    images: [
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800",
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/starbucks-khar",
    mapsLink: "https://maps.google.com/?q=Starbucks+Khar"
  },
  {
    id: 4,
    name: "Café Mondegar",
    subtitle: "Other Coffee Spot",
    type: "white",
    categories: ["cozy", "late"],
    lat: 18.9220,
    lng: 72.8330,
    distance: "8.5 km",
    openUntil: "1:00 AM",
    popularity: "High",
    address: "Metro House, Colaba Causeway, Colaba, Mumbai 400039",
    images: [
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/cafe-mondegar-colaba",
    mapsLink: "https://maps.google.com/?q=Cafe+Mondegar+Colaba"
  },
  {
    id: 5,
    name: "Birdsong Café",
    subtitle: "Coffee Date Spot #4",
    type: "gold",
    categories: ["cute", "scenic", "new"],
    lat: 19.0654,
    lng: 72.8356,
    distance: "1.5 km",
    openUntil: "11:00 PM",
    popularity: "Medium",
    address: "Waroda Road, Off Hill Road, Bandra West, Mumbai 400050",
    images: [
      "https://images.unsplash.com/photo-1464979681340-bdd28a61699e?w=800",
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/birdsong-the-organic-cafe-bandra-west",
    mapsLink: "https://maps.google.com/?q=Birdsong+Cafe+Bandra"
  },
  {
    id: 6,
    name: "Le 15 Café",
    subtitle: "Other Coffee Spot",
    type: "white",
    categories: ["cute", "budget"],
    lat: 19.0577,
    lng: 72.8310,
    distance: "1.0 km",
    openUntil: "9:00 PM",
    popularity: "Medium",
    address: "Palladium Mall, Lower Parel, Mumbai 400013",
    images: [
      "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/le-15-cafe-lower-parel",
    mapsLink: "https://maps.google.com/?q=Le+15+Cafe+Palladium"
  },
  {
    id: 7,
    name: "Bru GOLD Pop-Up",
    subtitle: "Limited Time Valentine's Experience",
    type: "special",
    categories: ["bru-gold"],
    lat: 19.0640,
    lng: 72.8372,
    distance: "1.3 km",
    openUntil: "10:00 PM",
    popularity: "Featured",
    address: "Carter Road Promenade, Bandra West, Mumbai 400050",
    images: [
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai",
    mapsLink: "https://maps.google.com/?q=Carter+Road+Bandra",
    isPopup: true,
    popupMessage: "Stop by for your golden coffee moment this Valentine's!"
  },
  {
    id: 8,
    name: "Kala Ghoda Café",
    subtitle: "Other Coffee Spot",
    type: "white",
    categories: ["scenic", "cozy"],
    lat: 18.9310,
    lng: 72.8318,
    distance: "9.2 km",
    openUntil: "11:30 PM",
    popularity: "High",
    address: "10, Ropewalk Lane, Kala Ghoda, Fort, Mumbai 400001",
    images: [
      "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/kala-ghoda-cafe-fort",
    mapsLink: "https://maps.google.com/?q=Kala+Ghoda+Cafe"
  },
  {
    id: 9,
    name: "The Pantry",
    subtitle: "Coffee Date Spot #5",
    type: "gold",
    categories: ["rooftop", "scenic", "late"],
    lat: 18.9283,
    lng: 72.8321,
    distance: "9.0 km",
    openUntil: "12:30 AM",
    popularity: "Very High",
    address: "Yeshwant Chambers, Military Square Lane, Kala Ghoda, Mumbai 400001",
    images: [
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
      "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/the-pantry-fort",
    mapsLink: "https://maps.google.com/?q=The+Pantry+Kala+Ghoda"
  },
  {
    id: 10,
    name: "Subko Coffee",
    subtitle: "Coffee Date Spot #6",
    type: "gold",
    categories: ["new", "cute", "budget"],
    lat: 19.0608,
    lng: 72.8380,
    distance: "1.1 km",
    openUntil: "10:00 PM",
    popularity: "Rising",
    address: "33rd Road, Near Pali Village Cafe, Bandra West, Mumbai 400050",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
    ],
    zomatoLink: "https://www.zomato.com/mumbai/subko-coffee-bandra-west",
    mapsLink: "https://maps.google.com/?q=Subko+Coffee+Bandra"
  }
];

export default coffeeSpots;
