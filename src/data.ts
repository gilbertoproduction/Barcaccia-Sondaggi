export const USERS = ["Simo", "Dave", "Filo", "Marco", "Pit"];

export interface Candidate {
  id: string;
  name: string;
  role: string;
  category: 'Dirigente' | 'Giocatore';
}

export const CANDIDATES: Candidate[] = [
  // Dirigenti
  { id: "1", name: "Damien Comolli", role: "Chief Executive Officer", category: "Dirigente" },
  { id: "2", name: "Greta Bodino", role: "Chief People, Culture and ESG Officer", category: "Dirigente" },
  { id: "3", name: "Stefano Braghin", role: "Women’s Football Director", category: "Dirigente" },
  { id: "4", name: "Stefano Cerrato", role: "Managing Director Corporate & Finance", category: "Dirigente" },
  { id: "5", name: "Giorgio Chiellini", role: "Director of Football Strategy", category: "Dirigente" },
  { id: "6", name: "François Modesto", role: "Technical Director", category: "Dirigente" },
  { id: "7", name: "Marco Ottolini", role: "Sporting Director", category: "Dirigente" },
  { id: "8", name: "Roberta Ponte", role: "Chief Legal Officer", category: "Dirigente" },
  { id: "9", name: "Peter Silverstone", role: "Chief Business Officer", category: "Dirigente" },
  { id: "10", name: "Pier Donato Vercellone", role: "Chief Communications Officer", category: "Dirigente" },
  
  // Portieri
  { id: "11", name: "Michele Di Gregorio", role: "Portiere", category: "Giocatore" },
  { id: "12", name: "Mattia Perin", role: "Portiere", category: "Giocatore" },
  { id: "13", name: "Carlo Pinsoglio", role: "Portiere", category: "Giocatore" },
  
  // Difensori
  { id: "14", name: "Bremer", role: "Difensore centrale", category: "Giocatore" },
  { id: "15", name: "Pierre Kalulu", role: "Difensore centrale", category: "Giocatore" },
  { id: "16", name: "Lloyd Kelly", role: "Difensore centrale", category: "Giocatore" },
  { id: "17", name: "Federico Gatti", role: "Difensore centrale", category: "Giocatore" },
  { id: "18", name: "Andrea Cambiaso", role: "Terzino sinistro", category: "Giocatore" },
  { id: "19", name: "Juan Cabal", role: "Terzino sinistro", category: "Giocatore" },
  { id: "20", name: "Emil Holm", role: "Terzino destro", category: "Giocatore" },
  
  // Centrocampisti
  { id: "21", name: "Manuel Locatelli", role: "Mediano", category: "Giocatore" },
  { id: "22", name: "Teun Koopmeiners", role: "Mediano", category: "Giocatore" },
  { id: "23", name: "Khéphren Thuram", role: "Centrocampista", category: "Giocatore" },
  { id: "24", name: "Weston McKennie", role: "Centrocampista", category: "Giocatore" },
  { id: "25", name: "Fabio Miretti", role: "Centrocampista", category: "Giocatore" },
  { id: "26", name: "Filip Kostić", role: "Esterno di sinistra", category: "Giocatore" },
  { id: "27", name: "Vasilije Adžić", role: "Trequartista", category: "Giocatore" },
  
  // Attaccanti
  { id: "28", name: "Kenan Yıldız", role: "Ala sinistra", category: "Giocatore" },
  { id: "29", name: "Jérémie Boga", role: "Ala sinistra", category: "Giocatore" },
  { id: "30", name: "Francisco Conceição", role: "Ala destra", category: "Giocatore" },
  { id: "31", name: "Edon Zhegrova", role: "Ala destra", category: "Giocatore" },
  { id: "32", name: "Dušan Vlahović", role: "Punta centrale", category: "Giocatore" },
  { id: "33", name: "Jonathan David", role: "Punta centrale", category: "Giocatore" },
  { id: "34", name: "Loïs Openda", role: "Punta centrale", category: "Giocatore" },
  { id: "35", name: "Arkadiusz Milik", role: "Punta centrale", category: "Giocatore" },
];
