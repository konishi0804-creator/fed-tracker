export interface FedMember {
  id: string;
  name: string;
  title: string;
  type: 'Board' | 'Regional';
  bank?: string;
  votingStatus: 'Voter' | 'Alternate' | 'Non-voter';
  stanceScore: number; // -1.0 (Dovish) to 1.0 (Hawkish)
  imageUrl?: string;
}

export const fedMembers: FedMember[] = [
  {
    id: 'jerome-powell',
    name: 'Jerome H. Powell',
    title: 'Chair',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: 0.2, // Slightly Hawkish
    imageUrl: '/images/members/jerome-powell.jpg'
  },
  {
    id: 'philip-jefferson',
    name: 'Philip N. Jefferson',
    title: 'Vice Chair',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: -0.1, // Neutral/Slightly Dovish
    imageUrl: '/images/members/philip-jefferson.jpg'
  },
  {
    id: 'michael-barr',
    name: 'Michael S. Barr',
    title: 'Vice Chair for Supervision',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: -0.2,
    imageUrl: '/images/members/michael-barr.jpg'
  },
  {
    id: 'michelle-bowman',
    name: 'Michelle W. Bowman',
    title: 'Governor',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: 0.8, // Hawkish
    imageUrl: '/images/members/michelle-bowman.jpg'
  },
  {
    id: 'lisa-cook',
    name: 'Lisa D. Cook',
    title: 'Governor',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: -0.4, // Dovish
    imageUrl: '/images/members/lisa-cook.jpg'
  },
  {
    id: 'stephen-miran',
    name: 'Stephen I. Miran',
    title: 'Governor',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: 0.0,
  },
  {
    id: 'christopher-waller',
    name: 'Christopher J. Waller',
    title: 'Governor',
    type: 'Board',
    votingStatus: 'Voter',
    stanceScore: 0.6, // Hawkish
    imageUrl: '/images/members/christopher-waller.jpg'
  },
  // Regional Presidents
  {
    id: 'john-williams',
    name: 'John C. Williams',
    title: 'President',
    type: 'Regional',
    bank: 'New York',
    votingStatus: 'Voter',
    stanceScore: 0.1,
    imageUrl: '/images/members/john-williams.jpg'
  },
  {
    id: 'austan-goolsbee',
    name: 'Austan D. Goolsbee',
    title: 'President',
    type: 'Regional',
    bank: 'Chicago',
    votingStatus: 'Non-voter',
    stanceScore: -0.7, // Dovish
    imageUrl: '/images/members/austan-goolsbee.jpg'
  },
  {
    id: 'neel-kashkari',
    name: 'Neel Kashkari',
    title: 'President',
    type: 'Regional',
    bank: 'Minneapolis',
    votingStatus: 'Non-voter',
    stanceScore: 0.7, // Hawkish
    imageUrl: '/images/members/neel-kashkari.jpg'
  },
  {
    id: 'susan-collins',
    name: 'Susan M. Collins',
    title: 'President',
    type: 'Regional',
    bank: 'Boston',
    votingStatus: 'Non-voter',
    stanceScore: -0.1,
    imageUrl: '/images/members/susan-collins.jpg'
  },
  {
    id: 'anna-paulson',
    name: 'Anna L. Paulson',
    title: 'President',
    type: 'Regional',
    bank: 'Philadelphia',
    votingStatus: 'Non-voter',
    stanceScore: -0.2,
    imageUrl: '/images/members/anna-paulson.jpg'
  },
  {
    id: 'beth-hammack',
    name: 'Beth M. Hammack',
    title: 'President',
    type: 'Regional',
    bank: 'Cleveland',
    votingStatus: 'Non-voter',
    stanceScore: 0.2,
    imageUrl: '/images/members/beth-hammack.jpg'
  },
  {
    id: 'thomas-barkin',
    name: 'Thomas I. Barkin',
    title: 'President',
    type: 'Regional',
    bank: 'Richmond',
    votingStatus: 'Voter',
    stanceScore: 0.4,
    imageUrl: '/images/members/thomas-barkin.jpg'
  },
  {
    id: 'cheryl-venable',
    name: 'Cheryl Venable',
    title: 'President',
    type: 'Regional',
    bank: 'Atlanta',
    votingStatus: 'Non-voter',
    stanceScore: 0.0,
  },
  {
    id: 'alberto-musalem',
    name: 'Alberto Musalem',
    title: 'President',
    type: 'Regional',
    bank: 'St. Louis',
    votingStatus: 'Non-voter',
    stanceScore: 0.3,
    imageUrl: '/images/members/alberto-musalem.jpg'
  },
  {
    id: 'jeffrey-schmid',
    name: 'Jeffrey R. Schmid',
    title: 'President',
    type: 'Regional',
    bank: 'Kansas City',
    votingStatus: 'Non-voter',
    stanceScore: 0.5,
    imageUrl: '/images/members/jeffrey-schmid.jpg'
  },
  {
    id: 'lorie-logan',
    name: 'Lorie K. Logan',
    title: 'President',
    type: 'Regional',
    bank: 'Dallas',
    votingStatus: 'Non-voter',
    stanceScore: 0.6,
    imageUrl: '/images/members/lorie-logan.jpg'
  },
  {
    id: 'mary-daly',
    name: 'Mary C. Daly',
    title: 'President',
    type: 'Regional',
    bank: 'San Francisco',
    votingStatus: 'Voter',
    stanceScore: 0.0,
    imageUrl: '/images/members/mary-daly.jpg'
  }
];
