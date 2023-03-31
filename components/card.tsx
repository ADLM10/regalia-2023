import Image from 'next/image'
import BandBash from './../public/images/regalia-bandbash.jpg'
const card = () => {
  return (
    <div>
    <div className="card">
      <Image width={1000} height={1000} src={BandBash} alt='' />
      <div>
        <h2>Invest in Valbs sparkling new construction</h2>
        <h3>Type: Residential rental</h3>
        <p>
          Soon you can invest in Sid Harmas new attractive property, set in
          the heart of Athens.
        </p>
        <button>Show the property project</button>
      </div>
    </div>
    </div>
  )
}

export default card