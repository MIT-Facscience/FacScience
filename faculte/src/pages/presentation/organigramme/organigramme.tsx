import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

type OrgNodeType = {
  title: string
  person?: {
    firstName: string
    lastName: string
    email?: string
    phone?: string
    building?: string
    photo?: string
    bio?: string
  }
  children?: OrgNodeType[]
}

type OrgNodeProps = {
  node: OrgNodeType
  level: number
}

export default function OrgNode({ node, level }: OrgNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  const hasChildren = node.children && node.children.length > 0

  // Couleur de la bordure des photos
  const getBorderColor = (title: string) => {
    if (/doyen/i.test(title)) return "border-blue-600"
    if (/vice.*doyen/i.test(title)) return "border-green-600"
    if (/conseil|collège/i.test(title)) return "border-gray-500"
    if (/mention|parcours|labo/i.test(title)) return "border-gray-400"
    if (/service|secrétaire/i.test(title)) return "border-gray-400"
    if (/association/i.test(title)) return "border-green-600"
    return "border-gray-300"
  }

  return (
    <div className="flex items-start">
      {/* Bloc parent */}
      <div className="flex flex-col items-center">
        {/* Carte principale */}
        <div className="p-4 flex flex-col items-center text-center border-2 border-gray-200 shadow-md bg-white">
          <img
            src={node.person?.photo || "/default-avatar.png"}
            alt={`${node.person?.firstName} ${node.person?.lastName}`}
            className={`object-cover rounded-full border-4 w-20 h-20 mb-2 ${getBorderColor(
              node.title
            )}`}
          />

          {/* Nom + titre */}
          <h3 className="font-bold text-lg text-gray-900">
            {node.person?.firstName} {node.person?.lastName}
          </h3>
          <p className="text-sm text-gray-600">{node.title}</p>

          {/* Boutons */}
          <div className="mt-2 flex space-x-2">
            {node.person && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
              >
                {showDetails ? "Masquer" : "Détails"}
              </button>
            )}
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </button>
            )}
          </div>

          {/* Bio + détails */}
          {showDetails && node.person && (
            <div className="mt-3 p-3 border-t text-sm text-gray-700 bg-gray-50 max-w-sm text-left">
              {node.person.email && (
                <p>
                  <strong>Email :</strong>{" "}
                  <a
                    href={`mailto:${node.person.email}`}
                    className="text-blue-600"
                  >
                    {node.person.email}
                  </a>
                </p>
              )}
              {node.person.phone && (
                <p>
                  <strong>Téléphone :</strong> {node.person.phone}
                </p>
              )}
              {node.person.building && (
                <p>
                  <strong>Bureau :</strong> {node.person.building}
                </p>
              )}
              {node.person.bio && (
                <p className="mt-2 italic">{node.person.bio}</p>
              )}
            </div>
          )}
        </div>

        {/* Ligne horizontale vers enfants */}
        {hasChildren && (
          <div className="w-12 h-px bg-gray-400 my-4"></div>
        )}
      </div>

      {/* Bloc enfants à droite */}
      {hasChildren && isExpanded && (
        <div className="flex flex-row gap-8 ml-8">
          {node.children!.map((child, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Ligne verticale descendante */}
              <div className="w-px h-6 bg-gray-400"></div>
              <OrgNode node={child} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
