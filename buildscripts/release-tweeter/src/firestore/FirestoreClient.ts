import * as admin from 'firebase-admin'
import Milestone from './Milestone'

const COLLECTION_MILESTONES = 'milestones'

export default class FirestoreClient {
  private readonly firebaseApp: admin.app.App
  private readonly firestore: admin.firestore.Firestore

  constructor(serviceAccount: any) {
    let sa = this.parseServiceAccount(serviceAccount)
    let cert = admin.credential.cert(sa)
    this.firebaseApp = admin.initializeApp({ credential: cert })
    this.firestore = this.firebaseApp.firestore()
  }

  private parseServiceAccount(serviceAccount: any): admin.ServiceAccount {
    return {
      type: serviceAccount.type,
      projectId: serviceAccount.project_id,
      privateKeyId: serviceAccount.private_key_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      clientId: serviceAccount.client_id,
      authUri: serviceAccount.auth_uri,
      tokenUri: serviceAccount.token_uri,
      authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
      clientC509CertUrl: serviceAccount.client_x509_cert_url
    } as admin.ServiceAccount
  }

  async addMilestone(milestone: Milestone) {
    let result = await this.firestore.collection(COLLECTION_MILESTONES).doc(`${milestone.number}`)
      .set({
        title: milestone.title,
        number: milestone.number,
        tweetUrl: milestone.tweetUrl,
        timestamp: milestone.timestamp
      })

    console.log('added', result)
  }

  async getMilestone(milestoneNumber: number): Promise<Milestone | null> {
    let ref = await this.firestore.collection(COLLECTION_MILESTONES).doc(`${milestoneNumber}`).get()
    if (ref.exists) {
      let data = ref.data()!
      return {
        title: data.title,
        number: data.number,
        tweetUrl: data.tweetUrl,
        timestamp: data.timestamp
      } as Milestone
    } else {
      return null
    }
  }
}
