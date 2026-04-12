import React, { useState } from 'react';
import { Instagram, X } from 'lucide-react';
import { SectionContent } from '../../services/pagesContent';

interface TeamMember {
  name: string;
  role: string;
  subtitle?: string;
  description: string;
  mission: string;
  image: string;
  instagram?: string;
}

interface AboutTeamProps {
  content: SectionContent;
}

const AboutTeam: React.FC<AboutTeamProps> = ({ content }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const team: TeamMember[] = [
    {
      name: "Philippe Paumier",
      role: "Fondateur de Vents et Courbes",
      subtitle: "Professeur de tournage",
      description: "Ayant pratiqué la sculpture métal et l'expression à l'encre de chine depuis des années, la nécessité de s'ouvrir à un autre champ artistique lui est apparu nécessaire et ce fût la céramique. Une formation diplômante telle que le CAP tournage obtenu en 2011 a changé ses vues professionnelles.",
      mission: "Rêver, créer, maîtriser la céramique, pour transmettre cette passion aux personnes qui ressentent un besoin analogue. L'enseignement l'a mené à développer une écriture sur la gestuelle et les positions du corps en situation de travail sur le tour, pour accompagner la fluidité du geste.",
      image: "https://i.ibb.co/4R4VcPYX/portrait-philippe.jpg",
      instagram: "https://www.instagram.com/philipp_paumier/"
    },
    {
      name: "Florence Volang",
      role: "Professeure de modelage",
      description: "Après un temps de flânerie à l'étranger et une activité dans l'économie solidaire, Florence s'est formée à l'atelier Vents & courbes durant 3 années et a obtenu son CAP en 2019.",
      mission: "Son inspiration et ses choix se sont tournés vers le modelage en développant des formes personnelles et sobres. C'est à travers cette passion qu'elle vous mènera à rentrer dans le champs de la création et ressentir la matière sous des formes les plus diverses.",
      image: "https://i.ibb.co/V89TkzF/portrait-florence.jpg",
      instagram: "https://www.instagram.com/florence_volang/"
    },
    {
      name: "Paola Rodriguez",
      role: "Professeure de tournage",
      description: "Après avoir obtenu son diplôme à la Villa Arson (Beaux-Arts de Nice), Paola s'est formée au tournage en céramique à l'atelier Vents et Courbes.",
      mission: "Sa formation CAP Tournage lui a permis de passer l'examen avec succès et de rejoindre l'équipe de Vents et Courbes en 2023. Forte de son expérience de sculptrice et ayant elle-même expérimenté la formation CAP tournage elle saura vous guider en respectant votre rythme d'apprentissage et vos difficultés.",
      image: "https://i.ibb.co/jvs747gV/portrait-paola.jpg",
      instagram: "https://www.instagram.com/rodcanpaola/"
    },
    {
      name: "Frédérique Buisson",
      role: "Professeure de tournage et modelage",
      description: "Après 7 années de pratique en sculpture-modelage, Frédérique a souhaité ouvrir son champ artistique au tournage céramique en effectuant une formation longue à Vents et Courbes.",
      mission: "C'est avec passion et amour que Frédérique vous transmettra et marquera vos premiers moments d'émotion avec la terre, tout cela dans un atelier très convivial !",
      image: "https://i.ibb.co/PzPrLr2b/portrait-frederique-ok.jpg",
      instagram: "https://www.instagram.com/fred.b_ceram/"
    },
    {
      name: "Sylvie Barbara",
      role: "Formatrice des stages tournage et recherche d'émail",
      description: "Ces études aux Beaux-Arts de Dijon, sa carrière de photographe et de graphiste, et l'obtention de son CAP tournage en 2009, lui ont permis d'affiner son regard sur la céramique.",
      mission: "Elle saura vous guider lors des stages pour perfectionner vos gestes, ou découvrir l'art de la céramique avec bienveillance.",
      image: "https://i.ibb.co/Xfwhfr1c/portrait-barbara.jpg",
      instagram: "https://www.instagram.com/onamaati/"
    },
    {
      name: "Vincent Lévy",
      role: "Formateur des stages impressions sur céramique",
      description: "Avant de devenir céramiste, Vincent Lévy est artiste vidéo/numérique et monteur de films documentaires.",
      mission: "Son univers céramique est lié à l'image, particulièrement l'image photographique sous forme d'archive documentaire. Il travaille plus particulièrement le grès et le papier porcelaine, ainsi que toutes les formes d'impression d'images possibles, comme les transferts décalcomanie ou la photo-lithographie.",
      image: "https://i.ibb.co/4RqtKctg/portrait-vincent.jpg",
      instagram: "https://www.instagram.com/viceramiques/"
    },
    {
      name: "Maria Bosch",
      role: "Formatrice des stages recherche d'engobes vitrifiés",
      description: "Afin de mettre en valeur la basse température, et toujours attiré par la poterie traditionnelle et avec l'idée, écologique-énergétique pour optimiser la proximité des ressources locales, Maria se plonge dans la recherche autodidacte sur les engobes à basse température.",
      mission: "C'est le choix d'une terre de poterie traditionnelle locale qui détermine tout son travail et ses recherches pour les finitions céramiques des engobes vitrifiées.",
      image: "https://i.ibb.co/Swc8dz4p/Maria-bosh.png",
      instagram: "https://www.instagram.com/mariabosch.ceramic/"
    }
  ];

  const openMemberModal = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
  };

  return (
    <>
      <section id="team-section" className="bg-stone-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-primary-400 mb-8">
              {content.team_title?.title || "Notre équipe"}
            </h2>
            <div className="w-24 h-1 bg-primary-400 mx-auto mb-8"></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
              {content.team_description?.content || "Des artistes passionnés et expérimentés qui vous accompagnent dans votre découverte de la céramique"}
            </p>
          </div>

          {/* Team Grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name and Role */}
                  <h3 className="text-lg font-medium text-gray-900 mb-1 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-primary-400 font-medium mb-3 text-sm">
                    {member.role}
                  </p>

                  {/* Short Description */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {member.description.substring(0, 80)}...
                  </p>

                  {/* Instagram Link */}
                  {member.instagram && (
                    <div className="mb-4">
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-pink-500 hover:text-pink-600 text-sm transition-colors"
                      >
                        <Instagram className="w-4 h-4 mr-2" strokeWidth={1.5} />
                        Suivre sur Instagram
                      </a>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button 
                    onClick={() => openMemberModal(member)}
                    className="w-full bg-primary-400 hover:bg-primary-500 text-white py-2 px-4 rounded-full text-sm font-medium transition-colors"
                  >
                    En apprendre plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeMemberModal();
            }
          }}
        >
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeMemberModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Content */}
            <div className="text-center mb-6">
              {/* Photo */}
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Name and Role */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMember.name}
              </h3>
              <p className="text-primary-400 font-medium text-lg mb-1">
                {selectedMember.role}
              </p>
              {selectedMember.subtitle && (
                <p className="text-gray-600 mb-6">
                  {selectedMember.subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Parcours</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.description}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Mission</h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedMember.mission}
                </p>
              </div>

              {/* Instagram Link in Modal */}
              {selectedMember.instagram && (
                <div className="text-center pt-4 border-t border-gray-100">
                  <a
                    href={selectedMember.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    <Instagram className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    Suivre sur Instagram
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutTeam;