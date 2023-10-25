import { House } from './house'

const house = new House().buildDoor('Wood').buildFence('Wood').buildWall('Iron').buildWindow('Casement')

house.show()
