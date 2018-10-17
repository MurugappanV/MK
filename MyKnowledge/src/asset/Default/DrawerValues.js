import { Images } from '../Images'

export const DrawerData = [
    {
      title: 'Settings', 
      data: [
        {routeName: 'DefaultSettings', title: 'Set Default Platform', img: Images.editImg}, 
        {routeName: 'NotificationSettings', title: 'Notifications', img: Images.notifyImg},
        {routeName: 'ChangePassword', title: 'Change Password', img: Images.unlockImg},
        {routeName: 'LogOut', title: 'Log out', img: Images.logoutImg}
      ]
    },
    {
      title: 'Document Types', 
      data: [
        {routeName: 'DocumentList', title: 'All', img: Images.allImg}, 
        {routeName: 'DocumentList', title: 'Newsletters', img: Images.fileImg},
        {routeName: 'DocumentList', title: 'Service Documents', img: Images.bookImg},
        {routeName: 'DocumentList', title: 'Videos', img: Images.videoImg},
        {routeName: 'DocumentList', title: 'Trainings', img: Images.trainingImg},
        {routeName: 'DocumentList', title: 'Communications', img: Images.bellImg}
      ]
    },
    {
      title: 'Contact Us', 
      data: [
        {routeName: 'Feedback', title: 'Feedback', img: Images.chatImg}, 
        {routeName: 'Help', title: 'Help', img: Images.userBlackImg}
      ]
    }
  ]