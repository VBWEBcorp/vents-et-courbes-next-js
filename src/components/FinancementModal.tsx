import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface FinancementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FinancementModal: React.FC<FinancementModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 z-10"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-primary-400 mb-6">
          Le financement de la formation
        </h2>

        {/* Content */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-stone-50 rounded-2xl p-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              Tous les éléments réglementaires concernant les possibilités de financement de la formation 
              professionnelle se trouvent sur le site du <strong>Ministère du Travail, de l'Emploi de la Formation 
              Professionnelle et du Dialogue Social</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Pour ne pas faire d'erreur, reportez-vous systématiquement au lien proposé. En cas de questions, 
              prenez rendez-vous directement à l'<strong>Académie des Métiers d'Art !</strong>
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>La recherche de financement est la deuxième étape du projet de formation.</strong> Il existe de très 
              nombreux dispositifs : pour vous repérer, faites un point sur votre situation personnelle. Que faites-vous ? 
              À quel acteur institutionnel êtes-vous rattaché (France Travail – ancien Pôle Emploi –, Agefiph, etc.) ?
            </p>
          </div>

          {/* CPF */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-500 font-bold text-sm">1</span>
              </div>
              Le CPF (Compte Personnel de Formation)
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilisable par tout salarié, tout au long de sa vie active, y compris en période de chômage, 
                pour suivre une formation qualifiante ou certifiante. Le CPF a remplacé le droit individuel 
                à la formation (Dif).
              </p>
              <a 
                href="https://www.moncompteformation.gouv.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-400 hover:text-primary-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                www.mon-compte-formation.fr
              </a>
            </div>
          </div>

          {/* CPF de Transition */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-500 font-bold text-sm">2</span>
              </div>
              Le CPF de Transition
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Le projet de transition professionnelle (PTP), ex-Cif, permet au salarié de s'absenter de son 
                poste afin de suivre une formation pour se qualifier, évoluer ou se reconvertir. Il est appelé CPF de transition.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Il est ouvert sous conditions et est accordé sur demande à l'employeur. Le salarié est rémunéré 
                pendant toute la durée de la formation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si vous vivez en Île-de-France, vous pouvez consulter le site :
              </p>
              <a 
                href="https://www.transitionspro-idf.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-400 hover:text-primary-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                www.transitionspro-idf.fr
              </a>
            </div>
          </div>

          {/* Contrat de professionnalisation */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-500 font-bold text-sm">3</span>
              </div>
              Le contrat de professionnalisation
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Le contrat de professionnalisation s'adresse aux <strong>jeunes âgés de 16 à 25 ans révolus</strong>, 
                aux <strong>demandeurs d'emploi âgés de 26 ans et plus</strong> et aux bénéficiaires de certaines 
                allocations ou contrats.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Son objectif est de leur permettre d'acquérir une qualification professionnelle ou de compléter 
                leur formation initiale par une qualification complémentaire en vue d'accéder à un poste déterminé 
                dans l'entreprise.
              </p>
              <div className="bg-primary-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Rémunération :</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• <strong>16-25 ans :</strong> Pourcentage du SMIC selon âge et niveau de formation</li>
                  <li>• <strong>26 ans et plus :</strong> Minimum SMIC ou 85% du salaire minimum conventionnel</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                Ce contrat ouvre droit pour l'employeur, pour certaines embauches et dans certaines limites, 
                à une exonération de cotisations patronales de sécurité sociale.
              </p>
            </div>
          </div>

          {/* Aides régionales */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-500 font-bold text-sm">4</span>
              </div>
              Les aides régionales et institutionnelles
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Île-de-France</h4>
                  <p className="text-gray-700 text-sm">Dispositif <strong>AIRE</strong> soumis à conditions</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">AIF</h4>
                  <p className="text-gray-700 text-sm"><strong>Aide Individuelle à la Formation</strong> pour demandeurs d'emploi</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Auvergne-Rhône-Alpes</h4>
                  <p className="text-gray-700 text-sm">Propose des aides spécifiques</p>
                </div>
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Nouvelle-Aquitaine</h4>
                  <p className="text-gray-700 text-sm">Aide jusqu'à <strong>5 000 €</strong></p>
                </div>
                <div className="bg-stone-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Normandie</h4>
                  <p className="text-gray-700 text-sm">Dispositif <strong>Qualif</strong></p>
                </div>
              </div>
              <p className="text-primary-500 font-medium mt-4 text-center">
                Il existe de nombreux exemples. Sollicitez les acteurs de votre territoire !
              </p>
            </div>
          </div>

          {/* Handicap */}
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-500 font-bold text-sm">5</span>
              </div>
              En cas de handicap reconnu
            </h3>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Vous pouvez solliciter l'<strong>AGEFIPH</strong>. N'hésitez pas à recourir aux associations 
                spécialisées comme la <strong>Fondation de la 2ème chance</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancementModal;