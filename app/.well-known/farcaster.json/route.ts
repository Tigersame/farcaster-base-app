import { minikitConfig } from '../../../minikit.config'

export async function GET() {
  // Generate manifest from minikitConfig
  // Only include defined fields to match Base Mini App specification
  const manifest: any = {
    accountAssociation: {
      header: minikitConfig.accountAssociation.header,
      payload: minikitConfig.accountAssociation.payload,
      signature: minikitConfig.accountAssociation.signature,
    },
    frame: {
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      iconUrl: minikitConfig.miniapp.iconUrl,
      homeUrl: minikitConfig.miniapp.homeUrl,
      imageUrl: minikitConfig.miniapp.heroImageUrl,
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
    }
  }

  return Response.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

