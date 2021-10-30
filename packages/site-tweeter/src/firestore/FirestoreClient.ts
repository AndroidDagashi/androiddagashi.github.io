
import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { initializeApp, cert, App, ServiceAccount } from 'firebase-admin/app'
import Milestone from './Milestone'

const COLLECTION_MILESTONES = 'milestones'

export default class FirestoreClient {
  private readonly firebaseApp: App
  private readonly firestore: Firestore

  constructor(serviceAccount: Record<string, unknown>) {
    const sa = this.parseServiceAccount(serviceAccount)
    this.firebaseApp = initializeApp({ credential: cert(sa) })
    this.firestore = getFirestore(this.firebaseApp)
  }

  private parseServiceAccount(
    serviceAccount: Record<string, unknown>
  ): ServiceAccount {
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
      clientC509CertUrl: serviceAccount.client_x509_cert_url,
    } as ServiceAccount
  }

  async addMilestone(milestone: Milestone): Promise<void> {
    const result = await this.firestore
      .collection(COLLECTION_MILESTONES)
      .doc(`${milestone.number}`)
      .set({
        title: milestone.title,
        number: milestone.number,
        tweetUrl: milestone.tweetUrl,
        createdAt: milestone.createdAt,
      })

    console.log('added', result)
  }

  async getMilestone(milestoneNumber: number): Promise<Milestone | null> {
    const ref = await this.firestore
      .collection(COLLECTION_MILESTONES)
      .doc(`${milestoneNumber}`)
      .get()
    if (ref.exists) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = ref.data()!
      return {
        title: data.title,
        number: data.number,
        tweetUrl: data.tweetUrl,
        createdAt: data.createdAt,
      } as Milestone
    } else {
      return null
    }
  }
}
