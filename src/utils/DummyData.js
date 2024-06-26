import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHistory, faImagePortrait, faFile,  faPeopleGroup, faCode, faBookBible} from '@fortawesome/free-solid-svg-icons';

export const navItems = [
  {
    id: "AboutCode01",
    icon:  <FontAwesomeIcon icon={faHistory} size="1x" />,
    to: '/aboutus',
    name: "About Us",
    subMenu: [
      {
        id: "AboutCode011",
        to: '/our-story',
        name: "Our Story",
      },
      {
        id: "AboutCode012",
        to: '/ias-goan-edge',
        name: "IAS Goan Edge",
      },
    ],
  },
  {
    id: "CourseCode02",
    icon: <FontAwesomeIcon icon={faBookBible} size="2x" />,
    to: '/classroom-courses',
    name: "Classroom courses",
    subMenu: [
      {
        id: "CourseCode021",
        to: '/comprehensive-classroom-program',
        name: "Comprehensive Classroom Program",
      },
      {
        id: "CourseCode022",
        to: '/weekend-classroom-program',
        name: "Weekend Classroom Program",
      },
      {
        id: "CourseCode023",
        to: '/crash-course-for-prelims',
        name: "Crash Course for Prelims",
      },
    ],
  },
  {
    id: "BlogCode03",
    icon: <FontAwesomeIcon icon={faFile} size="2x"/>,
    to: '/strategy-blog-and-discussion',
    name: "Strategy Blog and Discussion",
    subMenu: [
      {
        id: "BlogCode031",
        to: '/toppers-talk',
        name: "Toppers Talk",
      },
      {
        id: "BlogCode032",
        to: '/strategy-series',
        name: "Strategy series",
      },
      {
        id: "BlogCode033",
        to: '/reference-books-list',
        name: "Reference Books List",
      },
    ],
  },
  {
    id: "ContactCode04",
    icon: <FontAwesomeIcon icon={faAddressBook} size="2x"/>,
    to: '/contactus',
    name: "Contact Us",
    subMenu: [
      {
        id: "ContactCode041",
        to: '/IG-FB-Youtube-Phone-Address',
        name: "IG, FB, Youtube, Phone, Address",
      },
    ],
  },
  {
    id: "TestCode05",
    icon: <FontAwesomeIcon icon={faFile} size="2x"/>,
    to: '/test-series',
    name: "Test series",
    subMenu: [
      {
        id: "TestCode051",
        to: '/prelims-test-series-18',
        name: "Prelims Test series-18",
      },
      {
        id: "TestCode052",
        to: '/main-test-series-12',
        name: "Main test series-12",
      },
    ],
  },
  {
    id: "DailyPracCode06",
    icon: <FontAwesomeIcon icon={faCode} size="2x"/>,
    to: '/daily-practice',
    name: "Daily Practice",
    subMenu: [
      {
        id: "DailyPracCode061",
        to: '/article-of-the-day',
        name: "Article of the day",
      },
      {
        id: "DailyPracCode062",
        to: '/daily-prelims-question',
        name: "Daily Prelims question",
      },
      {
        id: "DailyPracCode063",
        to: '/main-question-of-the-day',
        name: "Main question of the day",
      },
    ],
  },
  {
    id: "SeminarCode07",
    icon: <FontAwesomeIcon icon={faPeopleGroup} size="2x"/>,
    to: '/upcoming-free-seminars',
    name: "Upcoming free seminars",
    subMenu: [
      {
        id: "SeminarCode071",
        to: '/just-give-dates-for-upcoming-planned',
        name: "Just give dates for upcoming planned",
      },
    ],
  },
  {
    id: "PictureCode08",
    icon: <FontAwesomeIcon icon={faImagePortrait} size="2x"/>,
    to: '/pictures',
    name: "Pictures",
    subMenu: [
      {
        id: "PictureCode081",
        to: '/comprehensive-classroom-program',
        name: "Comprehensive Classroom Program",
      },
      {
        id: "PictureCode082",
        to: '/Toppers-talk-program',
        name: "Toppers talk program",
      },
    ],
  },
];