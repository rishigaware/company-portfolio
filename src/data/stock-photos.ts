/**
 * STOCK PHOTOS — all from Unsplash (https://unsplash.com/license):
 * free to use for commercial and non-commercial purposes, no permission or attribution required.
 * Only free images.unsplash.com photos are used (no Unsplash+ premium images).
 *
 * These are placeholders for a demo. Replace the founder / leadership portraits with
 * real photos of your team before going live (put files in /public/images and use "/images/<file>.jpg").
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&w=${w}`;

export const stock = {
  // People (portraits)
  founder: u("photo-1573496359142-b8d87734a5a2", 1000),
  portraitManSmiling: u("photo-1507003211169-0a1dd7228f2d", 1000),
  portraitWoman: u("photo-1580489944761-15a19d654956", 1000),
  portraitManSuit: u("photo-1519085360753-af0119f7cbe7", 1000),

  // Lab & science
  labPipette: u("photo-1532187863486-abf9dbad1b69"),
  labCells: u("photo-1576086213369-97a306d36557"),
  labMicroscope: u("photo-1582719471384-894fbb16e074"),
  labCorridor: u("photo-1579154204601-01588f351e67"),
  medicinePacks: u("photo-1631549916768-4119b2e5f926"),
  engineerEquipment: u("photo-1581091226825-a6a2a5aee158"),
  engineerPlans: u("photo-1581092160562-40aa08e78837"),

  // Company life
  teamLaptops: u("photo-1522202176988-66273c2fd55f"),
  teamMeeting: u("photo-1517245386807-bb43f82c33c4"),
  officeMeeting: u("photo-1556761175-5973dc0f32e7"),
  whiteboardTraining: u("photo-1552664730-d307ca884978"),
  workshopAudience: u("photo-1524178232363-1fb2b075b655"),
  officeBuilding: u("photo-1486406146926-c627a92ad1ab"),
  officeInterior: u("photo-1497366216548-37526070297c"),

  // Events
  conferenceAudience: u("photo-1540575467063-178a50c2df87"),
  presentationStage: u("photo-1505373877841-8d25f7d46678"),
  keynoteRoom: u("photo-1511578314322-379afb476865"),
  exhibitionHall: u("photo-1531058020387-3be344556be6"),
  microphone: u("photo-1475721027785-f74eccf877e2"),
};
