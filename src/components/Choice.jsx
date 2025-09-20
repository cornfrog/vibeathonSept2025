import ductTapeImg from '../../assets/ducttape.png'
import flatheadImg from '../../assets/flathead.png'
import flashlightImg from '../../assets/flashlight.png'
import hammerImg from '../../assets/hammer.png'
import handsawImg from '../../assets/handsaw.png'
import hexKeyImg from '../../assets/hexkey.png'
import levelImg from '../../assets/level.png'
import phillipsHeadImg from '../../assets/phillipshead.png'
import pliersImg from '../../assets/pliers.png'
import powerDrillImg from '../../assets/powerdrill.png'
import stepStoolImg from '../../assets/stepstool.png'
import studFinderImg from '../../assets/studfinder.png'
import tapeMeasureImg from '../../assets/tapemeasure.png'
import utilityKnifeImg from '../../assets/utilityknife.png'
import wrenchImg from '../../assets/wrench.png'

import './Choice.scss'

const imageMap = {
  Hammer: hammerImg,
  Flathead: flatheadImg,
  'Phillips head': phillipsHeadImg,
  'Tape measure': tapeMeasureImg,
  Wrench: wrenchImg,
  Pliers: pliersImg,
  'Utility knife': utilityKnifeImg,
  Level: levelImg,
  'Power drill': powerDrillImg,
  'Hex key': hexKeyImg,
  Handsaw: handsawImg,
  Flashlight: flashlightImg,
  'Stud finder': studFinderImg,
  'Step stool': stepStoolImg,
  'Duct tape': ductTapeImg,
}

function Choice({ tool, onClick }) {
  const handleClick = (event) => {
    if (typeof onClick !== 'function') {
      return
    }

    onClick(event, tool)
  }

  const imageSrc = imageMap[tool]

  return (
    <button type="button" className="choice" onClick={handleClick}>
      {<img className="choice__image" src={imageSrc} alt={tool} />}
    </button>
  )
}

export default Choice
